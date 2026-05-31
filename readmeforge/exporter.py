def export_report(filename, content):

    with open(
        filename,
        "w",
        encoding="utf-8"
    ) as file:

        file.write(content)

    print(f"{filename} exported successfully!")