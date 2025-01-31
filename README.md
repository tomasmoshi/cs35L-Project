# Git Branching and Pull Requests Guide

This guide provides a structured workflow for creating branches, submitting pull requests, and using essential Git commands for branching and rebasing.

---

## 📌 1. Branch Naming Convention
When creating a new branch, follow the naming format:  
**`Dev/Name/Branch`**  

### ✅ Example:
```bash
git checkout -b Dev/JohnDoe/FeatureX
```
This ensures clarity on who is working on which feature.

---

## 🚀 2. How to Submit a Pull Request (PR)

Follow these steps to submit a PR correctly:

### **Step 1: Ensure Your Branch is Up to Date**
```bash
git checkout Dev/YourName/FeatureX  # Switch to your feature branch
git pull origin main  # Ensure your branch is up to date with main
```

### **Step 2: Push Your Branch to Remote Repository**
```bash
git push origin Dev/YourName/FeatureX
```

### **Step 3: Create a Pull Request**
1. Go to your repository on **GitHub/GitLab/Bitbucket**.
2. Navigate to the **"Pull Requests"** section.
3. Click **"New Pull Request"**.
4. Select your branch (`Dev/YourName/FeatureX`) as the source.
5. Set `main` or `develop` as the target branch.
6. Add a **clear title** and **detailed description** of your changes.
7. Click **"Create Pull Request"** and request reviews.

### **Step 4: Address Feedback & Merge**
- Review comments from team members.
- Make necessary changes and push again (`git push origin Dev/YourName/FeatureX`).
- Once approved, **merge your PR**.

---

## 🔀 3. Essential Git Branching & Rebasing Commands

### **Creating and Switching Branches**
```bash
git checkout -b Dev/YourName/NewFeature  # Create and switch to a new branch
git checkout main  # Switch back to main
```

### **Pushing Your Changes**
```bash
git add .  # Stage all changes
git commit -m "Your commit message"  # Commit changes
git push origin Dev/YourName/NewFeature  # Push to remote branch
```

### **Fetching and Rebasing (Keeping Your Branch Updated)**
```bash
git fetch origin main  # Fetch latest changes from main
git rebase origin/main  # Rebase your branch onto main
```

### **Handling Merge Conflicts During Rebase**
If you encounter conflicts while rebasing:
```bash
git status  # Identify conflicting files
# Manually resolve conflicts in the files
git add resolved_file.txt  # Mark conflicts as resolved
git rebase --continue  # Continue rebase process
```

### **Merging a Branch**
```bash
git checkout main  # Switch to main branch
git merge Dev/YourName/NewFeature  # Merge changes
git push origin main  # Push merged changes
```

### **Deleting a Branch After Merge**
```bash
git branch -d Dev/YourName/NewFeature  # Delete local branch
git push origin --delete Dev/YourName/NewFeature  # Delete remote branch
```

---

## 🎯 4. Additional Best Practices

✔️ **Always keep your branch up to date** with the latest changes from `main`.  
✔️ **Write clear commit messages** that describe your changes.  
✔️ **Resolve merge conflicts carefully** and test after rebasing.  
✔️ **Avoid pushing directly to `main`**—always use feature branches and PRs.  
✔️ **Keep your branches small** and focused on a single feature or bug fix.  
