# PowerShell script to fix unterminated string constants in TypeScript import statements
# This script finds and fixes import statements that have missing closing quotes

$sharedPath = "packages\shared\src"
$files = Get-ChildItem -Path $sharedPath -Recurse -Include "*.ts", "*.tsx"

Write-Host "Found $($files.Count) TypeScript files to check..."

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    
    # Fix import statements with missing closing quotes
    # Pattern: import ... from '@shared/..."; (missing closing quote)
    $content = $content -replace "from '@shared/([^']*)\"; ", "from '@shared/`$1'; "
    
    # Pattern: import ... from "@shared / ..."; (missing closing quote)  
    $content = $content -replace 'from "@shared/([^"]*)\"; ', 'from "@shared/`$1"; '
    
    # Check if content was modified
    if ($content -ne $originalContent) {
        Write-Host "Fixed import statements in: $($file.FullName)"
        Set-Content -Path $file.FullName -Value $content -NoNewline
    }
}

Write-Host "Import statement fixes completed!"