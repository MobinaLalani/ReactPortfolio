param (
    [Parameter(Mandatory = $true)]
    [string]$Environment
)

Write-Host "Deploying React app to $Environment server..."

switch ($Environment) {
    "Development" {
        $publishPath = "dev-supervisor"
    }
    "Staging" {
        $publishPath = "stage-supervisor"
    }
    "Production" {
        $publishPath = "supervisor"
    }
    default {
        throw "Unknown Environment: $$Environment"
    }
}

Copy-Item -Path "$env:CI_PROJECT_DIR\build\*" -Destination "C:\Apps\halaz.ir\$publishPath" -Recurse -Force
