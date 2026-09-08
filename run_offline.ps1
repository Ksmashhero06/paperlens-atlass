Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Starting PaperLens Application Locally " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$RepoRoot = Get-Location

Write-Host "Starting Frontend on http://localhost:8080 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$RepoRoot\frontend'; npm run dev"

Write-Host "Starting Backend on http://localhost:8000 ..." -ForegroundColor Green
$BackendCmd = "cd '$RepoRoot\backend'; try { python -c `"import socket; socket.gethostbyname('db.wuacpjaxqjmmhpnyibdo.supabase.co')`" 2>`$null } catch { Write-Host 'Cloud DB unreachable, falling back to local SQLite database...' -ForegroundColor Yellow; `$env:DATABASE_URL='sqlite+aiosqlite:///./paperlens_v2.db' }; python -m uvicorn app.main:app --reload --port 8000 --host 0.0.0.0"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "$BackendCmd"

Write-Host "PaperLens Application Started!" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:8080" -ForegroundColor White
Write-Host "Backend:  http://localhost:8000" -ForegroundColor White
Write-Host "API Docs: http://localhost:8000/docs" -ForegroundColor White
