# sync.ps1 - Day du lieu local len git (snapshot DB + code + uploads).
# Yeu cau: BE Postgres dang chay.

# Continue khong Stop - git warnings (LF/CRLF) khong duoc lam fail script.
# Kiem tra ket qua bang $LASTEXITCODE thu cong.
$ErrorActionPreference = 'Continue'
$Root = $PSScriptRoot
$Be   = Join-Path $Root 'be-vsoftware'
$Fe   = Join-Path $Root 'fe-vsoftware'

$timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
$commitMsg = "sync: $timestamp"

$result = @{
    snapshotUpdated = $false
    beCommitHash    = ''
    feCommitHash    = ''
    errors          = @()
}

Write-Host ''
Write-Host '=========================================================' -ForegroundColor Cyan
Write-Host '  SYNC LOCAL -> GIT (Buoc 1/2 cua workflow update)' -ForegroundColor Cyan
Write-Host '=========================================================' -ForegroundColor Cyan
Write-Host ''

# Step 1: Dump DB
Write-Host '==> [1/4] Dump DB local thanh snapshot.json...' -ForegroundColor Cyan
Set-Location $Be
$null = npm run dump:all 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[X]   Dump DB FAIL (exit $LASTEXITCODE)" -ForegroundColor Red
    Write-Host '[!!]  Kiem tra BE Postgres da chay chua (start.ps1 hoac docker)' -ForegroundColor Yellow
    Set-Location $Root
    exit 1
}
$result.snapshotUpdated = $true
Write-Host '[OK]  Dump DB thanh cong' -ForegroundColor Green

# Step 2: Commit + push BE
Write-Host ''
Write-Host '==> [2/4] Kiem tra thay doi BE...' -ForegroundColor Cyan
Set-Location $Be
$beStatus = git status --porcelain 2>$null
if ([string]::IsNullOrWhiteSpace($beStatus)) {
    Write-Host '[!!]  BE: khong co thay doi gi de day' -ForegroundColor Yellow
}
else {
    $changedCount = ($beStatus -split "`n").Count
    Write-Host "==> BE: phat hien $changedCount file thay doi, commit + push..." -ForegroundColor Cyan
    $null = & git add -A 2>&1
    $null = & git commit -m "$commitMsg" 2>&1
    if ($LASTEXITCODE -eq 0) {
        $result.beCommitHash = (git rev-parse --short HEAD).Trim()
        Write-Host "[OK]  BE da commit: $($result.beCommitHash)" -ForegroundColor Green
        $null = & git push origin main 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host '[OK]  BE da push len git' -ForegroundColor Green
        }
        else {
            Write-Host '[X]   BE push FAIL - chay git pull trong be-vsoftware roi thu lai' -ForegroundColor Red
            $result.errors += 'be-push-failed'
        }
    }
    else {
        Write-Host '[!!]  BE: commit khong tao ra thay doi' -ForegroundColor Yellow
    }
}

# Step 3: Commit + push FE
Write-Host ''
Write-Host '==> [3/4] Kiem tra thay doi FE...' -ForegroundColor Cyan
Set-Location $Fe
$feStatus = git status --porcelain 2>$null
if ([string]::IsNullOrWhiteSpace($feStatus)) {
    Write-Host '[!!]  FE: khong co thay doi gi de day' -ForegroundColor Yellow
}
else {
    $changedCount = ($feStatus -split "`n").Count
    Write-Host "==> FE: phat hien $changedCount file thay doi, commit + push..." -ForegroundColor Cyan
    $null = & git add -A 2>&1
    $null = & git commit -m "$commitMsg" 2>&1
    if ($LASTEXITCODE -eq 0) {
        $result.feCommitHash = (git rev-parse --short HEAD).Trim()
        Write-Host "[OK]  FE da commit: $($result.feCommitHash)" -ForegroundColor Green
        $null = & git push origin main 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host '[OK]  FE da push len git' -ForegroundColor Green
        }
        else {
            Write-Host '[X]   FE push FAIL - chay git pull trong fe-vsoftware roi thu lai' -ForegroundColor Red
            $result.errors += 'fe-push-failed'
        }
    }
    else {
        Write-Host '[!!]  FE: commit khong tao ra thay doi' -ForegroundColor Yellow
    }
}

# Step 4: Tong ket
Set-Location $Root
Write-Host ''
Write-Host '==> [4/4] Tong ket...' -ForegroundColor Cyan
Write-Host ''

$totalOk = ($result.errors.Count -eq 0)

if ($totalOk) {
    Write-Host '=========================================================' -ForegroundColor Green
    Write-Host '  [OK] DA DAY THANH CONG LEN GIT' -ForegroundColor Green
    Write-Host '=========================================================' -ForegroundColor Green
    Write-Host ''
    Write-Host "  Thoi gian      : $timestamp"
    Write-Host "  Snapshot DB    : $($result.snapshotUpdated)"
    Write-Host "  BE commit      : $($result.beCommitHash)"
    Write-Host "  FE commit      : $($result.feCommitHash)"
    Write-Host ''
    Write-Host '=========================================================' -ForegroundColor Yellow
    Write-Host '  BUOC TIEP THEO - SSH len server prod va go:' -ForegroundColor Yellow
    Write-Host '' -ForegroundColor Yellow
    Write-Host '      cd be-vsoftware && bash deploy.sh' -ForegroundColor White -BackgroundColor DarkYellow
    Write-Host '' -ForegroundColor Yellow
    Write-Host '  Server se tu cap nhat website trong ~2-5 phut.' -ForegroundColor Yellow
    Write-Host '=========================================================' -ForegroundColor Yellow
    Write-Host ''
    exit 0
}
else {
    Write-Host '=========================================================' -ForegroundColor Red
    Write-Host '  [X] SYNC GAP LOI - xem chi tiet o tren' -ForegroundColor Red
    Write-Host '=========================================================' -ForegroundColor Red
    Write-Host ''
    Write-Host '  Cac loi:'
    $result.errors | ForEach-Object { Write-Host "    - $_" -ForegroundColor Red }
    Write-Host ''
    exit 1
}
