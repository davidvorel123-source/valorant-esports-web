$content = [System.IO.File]::ReadAllText('styles.css')
$open = [regex]::Matches($content, '\{').Count
$close = [regex]::Matches($content, '\}').Count
Write-Host "Open: $open, Close: $close"
if ($open -eq $close) { exit 0 } else { exit 1 }
