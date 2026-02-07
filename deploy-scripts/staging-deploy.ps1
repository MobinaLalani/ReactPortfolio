Write-Host "Deploying React app to staging server..."
# Example for Windows/IIS deployment
Copy-Item -Path "$env:CI_PROJECT_DIR\build\*" -Destination "C:\Apps\halaz.ir\stage-fleet" -Recurse -Force
