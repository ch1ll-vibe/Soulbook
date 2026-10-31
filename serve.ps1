# Tiny static file server for previewing the site locally (no Node or Python needed).
# Usage: powershell -ExecutionPolicy Bypass -File serve.ps1   then open http://localhost:8765
param([int]$Port = 8765, [string]$Root = (Join-Path $PSScriptRoot 'docs'))

$types = @{ '.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.js'='application/javascript; charset=utf-8';
            '.json'='application/json'; '.png'='image/png'; '.webp'='image/webp'; '.svg'='image/svg+xml'; '.ico'='image/x-icon'; '.txt'='text/plain' }
$root = (Resolve-Path $Root).Path
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $root at http://localhost:$Port/"
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
  if ($path -eq '/') { $path = '/index.html' }
  $file = [IO.Path]::GetFullPath((Join-Path $root $path.TrimStart('/')))
  $res = $ctx.Response
  # Local-only helper: POST /save?name=<file> stores the request body in ../exports (used to export rendered images).
  if ($ctx.Request.HttpMethod -eq 'POST' -and $path -eq '/save') {
    $name = [regex]::Replace(($ctx.Request.QueryString['name'] | Out-String).Trim(), '[^A-Za-z0-9._-]', '')
    $outDir = Join-Path $PSScriptRoot 'exports'; New-Item -ItemType Directory -Force $outDir | Out-Null
    $ms = New-Object IO.MemoryStream; $ctx.Request.InputStream.CopyTo($ms)
    if ($name) { [IO.File]::WriteAllBytes((Join-Path $outDir $name), $ms.ToArray()) }
    $bytes = [Text.Encoding]::UTF8.GetBytes("saved $name ($($ms.Length) bytes)")
    $res.StatusCode = 200; $res.ContentType = 'text/plain'
    $res.ContentLength64 = $bytes.Length; $res.OutputStream.Write($bytes, 0, $bytes.Length); $res.Close(); continue
  }
  if ($file.StartsWith($root) -and (Test-Path $file -PathType Leaf)) {
    $bytes = [IO.File]::ReadAllBytes($file)
    $ext = [IO.Path]::GetExtension($file).ToLower()
    $res.ContentType = if ($types[$ext]) { $types[$ext] } else { 'application/octet-stream' }
    $res.Headers['Cache-Control'] = 'no-store'
    $res.StatusCode = 200
  } elseif (Test-Path (Join-Path $root '404.html') -PathType Leaf) {
    # Like GitHub Pages: serve the site's own 404 page for any missing address.
    $bytes = [IO.File]::ReadAllBytes((Join-Path $root '404.html'))
    $res.ContentType = 'text/html; charset=utf-8'
    $res.StatusCode = 404
  } else {
    $bytes = [Text.Encoding]::UTF8.GetBytes('404 not found')
    $res.StatusCode = 404
  }
  $res.ContentLength64 = $bytes.Length
  $res.OutputStream.Write($bytes, 0, $bytes.Length)
  $res.Close()
}
