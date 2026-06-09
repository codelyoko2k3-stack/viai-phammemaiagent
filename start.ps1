$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$be   = Join-Path $root "be-vsoftware"
$fe   = Join-Path $root "fe-vsoftware"

Write-Host "==> Chay migration BE..." -ForegroundColor Cyan
Set-Location $be
npm run migration:run
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARN] Migration co loi, kiem tra lai database." -ForegroundColor Yellow
}

Write-Host "==> Khoi dong BE (port 3001)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$be'; npm run start:dev" -WindowStyle Normal

Write-Host "==> Khoi dong FE (port 3000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$fe'; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "==> Done! Truy cap:" -ForegroundColor Green
Write-Host "    FE : http://localhost:3000" -ForegroundColor Green
Write-Host "    BE : http://localhost:3001/docs" -ForegroundColor Green
Write-Host "    Admin: http://localhost:3000/admin  (root@vsoftware.vn / vitechgroup)" -ForegroundColor Green
