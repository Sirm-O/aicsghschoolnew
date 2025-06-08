# Sengani Girls School Website - GitHub Setup Guide

This guide will walk you through the process of pushing this project to GitHub and connecting it with Netlify for CMS functionality.

## Prerequisites

1. A GitHub account
2. Git installed on your computer
3. A Netlify account

## Step 1: Create a New GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click on the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., "sengani-school-website")
4. Choose whether to make it public or private
5. Do not initialize the repository with a README, .gitignore, or license
6. Click "Create repository"

## Step 2: Initialize Git in the Project Folder

1. Extract the zip file to a location on your computer
2. Open a terminal or command prompt
3. Navigate to the extracted project folder:
   ```
   cd path/to/sengani-school-vercel
   ```
4. Initialize a Git repository:
   ```
   git init
   ```
5. Add all files to the staging area:
   ```
   git add .
   ```
6. Commit the files:
   ```
   git commit -m "Initial commit"
   ```

## Step 3: Connect to GitHub Repository

1. Add the remote repository URL (replace `YOUR_USERNAME` with your GitHub username and `REPOSITORY_NAME` with your repository name):
   ```
   git remote add origin https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git
   ```
2. Push the code to GitHub:
   ```
   git push -u origin main
   ```
   Note: If your default branch is named "master" instead of "main", use:
   ```
   git push -u origin master
   ```

## Step 4: Set Up Netlify for CMS Functionality

1. Go to [Netlify](https://netlify.com) and sign in to your account
2. Click "New site from Git"
3. Select GitHub as your Git provider
4. Authorize Netlify to access your GitHub repositories
5. Select the repository you just created
6. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
7. Click "Deploy site"

## Step 5: Enable Netlify Identity and Git Gateway

1. Once your site is deployed, go to the site settings in Netlify
2. Navigate to "Identity" and click "Enable Identity"
3. Under Identity settings:
   - Set Registration preferences to "Invite only"
   - Enable "Git Gateway"
4. Go to "Identity" > "Invitations" and invite yourself as an admin user

## Step 6: Update CMS Configuration

1. In your local project, open `public/admin/config.yml`
2. Update the backend configuration to use your Netlify site:
   ```yaml
   backend:
     name: git-gateway
     branch: main  # or master, depending on your default branch
   ```
3. Commit and push the changes:
   ```
   git add public/admin/config.yml
   git commit -m "Update CMS configuration for Netlify"
   git push
   ```

## Step 7: Access the CMS

1. Once Netlify redeploys your site, go to your Netlify site URL followed by `/admin/`
2. Sign in using the email you invited in Step 5
3. You should now have access to the CMS and be able to edit content

## Troubleshooting

- If you encounter issues with Git Gateway, make sure your GitHub repository is properly connected to Netlify
- If the CMS doesn't load, check the browser console for errors
- Make sure Netlify Identity is properly configured
- Verify that the `config.yml` file has the correct backend configuration

## Additional Resources

- [Netlify CMS Documentation](https://www.netlifycms.org/docs/intro/)
- [Netlify Identity Documentation](https://docs.netlify.com/visitor-access/identity/)
- [Git Gateway Documentation](https://docs.netlify.com/visitor-access/git-gateway/)

