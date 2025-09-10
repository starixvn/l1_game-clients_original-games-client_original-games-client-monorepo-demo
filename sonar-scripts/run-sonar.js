const scanner = require("sonarqube-scanner").default;

scanner(
    {
        serverUrl: "https://sonarqube.lumigame.com",
        token: process.env.SONAR_TOKEN || "",
        options: {
            "sonar.projectKey": "sedie-multiplayer-client",
            "sonar.projectName": "SeDie Multiplayer Client",
            "sonar.projectVersion": "1.0.0",
            "sonar.sources": "packages/shared/src,packages/sedie-multiplayer/src",
            "sonar.tests":
                "packages/shared/src/components/round-base/__tests__,packages/shared/src/helpers/__tests__,packages/shared/src/react-hooks/__tests__,packages/sedie-multiplayer/src/__tests__",
            "sonar.exclusions":
                "**/*.d.ts,**/*.config.js,**/*.config.ts,**/*.config.json,**/node_modules/**,**/.next/**,**/coverage/**,**/reports/**,**/stryker-examples/**,**/__mocks__/**,**/*.test.tsx,**/*.test.ts,**/*.spec.tsx,**/*.spec.ts,**/*.md",
            "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
            // "sonar.testExecutionReportPaths": "reports/test-reporter.xml",
            "sonar.typescript.tsconfigPath": "tsconfig.json",
            "sonar.qualitygate.wait": "true",
        },
    },
    () => process.exit()
);
