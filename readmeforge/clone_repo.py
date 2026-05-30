from git import Repo
import os

def clone_repository(repo_url):
    
    repo_name = repo_url.split("/")[-1].replace(".git", "")
    
    clone_path = os.path.join("repos", repo_name)

    if os.path.exists(clone_path):
        print("Repository already exists.")
        return clone_path

    print("Cloning repository...")

    Repo.clone_from(repo_url, clone_path)

    print("Repository cloned successfully!")

    return clone_path


if __name__ == "__main__":

    repo_url = input("Enter GitHub repo URL: ")

    path = clone_repository(repo_url)

    print("Saved at:", path)