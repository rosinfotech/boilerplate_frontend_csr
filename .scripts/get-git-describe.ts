import { exec } from "child_process";
import { promisify } from "util";
import gitDescribe from "git-describe";


const execAsync = promisify(exec);

export const getGitDescribe = async () => {
    const gitDescribeInfo = await gitDescribe.gitDescribe({
        long: false,
    });

    const callSafely = async <GReturn>(fn: () => Promise<GReturn>) => {
        try {
            return await fn();
        } catch {
            return null;
        }
    };

    const getGitCommitHash = async () =>
        callSafely(async () => {
            const { stdout } = await execAsync("git rev-parse HEAD");
            return stdout.trim();
        });

    const getCurrentGitBranch = async () =>
        callSafely(async () => {
            const { stdout } = await execAsync("git branch --show-current");
            return stdout.trim();
        });

    const getReleaseStage = (currentBranchName: string | null, argv: string[]) => {
        if (argv.includes("dev")) return "local";
        if (currentBranchName === "main") return "production";
        if (currentBranchName === "staging") return "staging";
        return "development";
    };

    const [currentBranch, gitCommitHash] = await Promise.all([
        getCurrentGitBranch(),
        getGitCommitHash(),
    ]);

    const releaseStage = getReleaseStage(currentBranch, process.argv);
    const npmPackageVersion = process.env.npm_package_version;

    return {
        "import.meta.env.VITE_APP_RELEASE_STAGE": JSON.stringify(releaseStage),
        "import.meta.env.VITE_APP_VERSION_SEMVER": JSON.stringify(
            npmPackageVersion ??
                [
                    gitDescribeInfo.semver?.major ?? "?",
                    gitDescribeInfo.semver?.minor ?? "?",
                    gitDescribeInfo.semver?.patch ?? "?",
                ].join(".")
        ),
        "import.meta.env.VITE_GIT_COMMIT_HASH": JSON.stringify(
            gitCommitHash ?? gitDescribeInfo.hash
        ),
        "import.meta.env.VITE_GIT_COMMIT_HASH_SHORT": JSON.stringify(
            (gitCommitHash ?? "").substring(0, 8)
        ),
        "import.meta.env.VITE_GIT_DISTANCE": JSON.stringify(gitDescribeInfo.distance),
        "import.meta.env.VITE_GIT_TAG": JSON.stringify(gitDescribeInfo.tag),
    };
};
