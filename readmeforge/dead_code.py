import os


def find_dead_code(repo_path):

    dead_code = []

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

                        # TODO markers
                        if "TODO" in content:

                            dead_code.append(
                                f"TODO found in {path}"
                            )

                        # unfinished code
                        if "\npass" in content:

                            dead_code.append(
                                f"Possible unfinished code in {path}"
                            )

                        # empty functions
                        if "def " in content and "pass" in content:

                            dead_code.append(
                                f"Potential empty function in {path}"
                            )

                except:
                    pass

    return dead_code