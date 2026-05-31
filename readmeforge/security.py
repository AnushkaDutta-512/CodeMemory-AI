import os
import re


def security_scan(repo_path):

    vulnerabilities = []

    secret_patterns = [
        r"API_KEY\s*=",
        r"SECRET_KEY\s*=",
        r"PASSWORD\s*=",
        r"ACCESS_TOKEN\s*=",
    ]

    for root, dirs, files in os.walk(repo_path):

        for file in files:

            if file.endswith(".py"):

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