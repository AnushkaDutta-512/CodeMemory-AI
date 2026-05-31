import os
import re


def security_scan(repo_path):

    vulnerabilities = []

    secret_patterns = [
        r"API_KEY\s*=\s*['\"].+['\"]",
        r"SECRET_KEY\s*=\s*['\"].+['\"]",
        r"PASSWORD\s*=\s*['\"].+['\"]",
        r"ACCESS_TOKEN\s*=\s*['\"].+['\"]",
        r"JWT_SECRET\s*=\s*['\"].+['\"]",
        r"jwt\.encode\(.*,.*['\"].+['\"].*\)"
    ]

    for root, dirs, files in os.walk(repo_path):

        # Check for exposed .env files
        if ".env" in files:
            vulnerabilities.append(f"Exposed .env file found in {root}")

        for file in files:

            if file.endswith((".py", ".js", ".ts")):

                path = os.path.join(
                    root,
                    file
                )

                try:

                    with open(
                        path,
                        "r",
                        encoding="utf-8"
                    ) as f:

                        content = f.read()

                        # Debug mode
                        if "debug=True" in content:

                            vulnerabilities.append(
                                f"Debug mode enabled in {path}"
                            )

                        # Dangerous eval
                        if "eval(" in content:
                            vulnerabilities.append(
                                f"Unsafe eval() usage in {path}"
                            )

                        # Dangerous subprocess / os.system
                        if "subprocess.run(" in content or "subprocess.Popen(" in content or "os.system(" in content:
                            vulnerabilities.append(
                                f"Dangerous subprocess execution in {path}"
                            )

                        # Unsafe pickle usage
                        if "pickle.load(" in content or "pickle.loads(" in content:
                            vulnerabilities.append(
                                f"Unsafe deserialization (pickle) in {path}"
                            )

                        # Hardcoded secrets
                        for pattern in secret_patterns:

                            if re.search(
                                pattern,
                                content
                            ):

                                vulnerabilities.append(
                                    f"Possible hardcoded secret in {path}"
                                )

                except:
                    pass

    return vulnerabilities