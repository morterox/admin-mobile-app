# Contributing

* When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

  * Please note we have a code of conduct, please follow it in all your interactions with the project.
## Set-up process

* This guide will detail how the repo should be run. By now, it is aimed to iOS users.
	
### Tools required

1. Install android-studio
2. Install XCode
 
### Initial steps (run once)
1. run `git clone git@github.com:Wallaby-Tech/csha-mobile-app.git` or `git clone https://github.com/Wallaby-Tech/csha-mobile-app.git` for cloning the project.
2. Run `yarn`
3. **OPTIONAL:** if you want to run the iOS emulator, run `cd ios` and then:
	i. **IF M1 CHIP**: `sudo arch -x86_64 gem install ffi` and then `arch -x86_64 pod install`
	ii.**IF INTEL CHIP**: `pod install`
4. Run `react-native run android` and `react-native run-ios` for checking if emulators were configurated and both work.
 
## Pull Request Process
 
### Work in updates to the source code (version updates, features, fixes, improvements, refactors as example)

1. branch from develop running `git checkout -b {prefix}/branch-name` where prefix:
	a. Use {feat} for features.
	b. Use {fix} for fixes.
	c. Use {improvement} for refactors.
	d. Use {doc} for documentation.
	e. Use {config} for configuration or versions. 
2. Work on that branch
3.  Add files and commit using `[{Task ID on task manager}] {brief description of the work done}` as commit name
4. Run following steps until everything works ok:
	a. `yarn test`
	b. `yarn lint`
5. `git push --setup-upstrean origin {prefix}-branch-name`
6. Create the PR to develop
7. Assign a reviewer
8. Run `git fetch develop` and then `git rebase develop`. In case of conflicts, resolve and push.
9. Get your PR pass all the verifications and no diffs with develop
10. Update the version of the code`npm version patch`. The versioning scheme we use is [SemVer](http://semver.org/).
11. In order to mantain a clean github chart, run `git rebase -i HEAD~{n}` where n is the number of the new commits added in the future. We should just merge ONE commit to develop.
12. After rebase, run `git push -f` 
13. Get your PR pass all the verifications and no diffs with develop
14. Notify the reviewer and wait until approves
15. Merge to develop if no diffs with develop branch.

**NOTE:** Update the README.md with details of changes to the interface, this includes new environment

variables, exposed ports, useful file locations and container parameters.

**NOTE:** You may merge the Pull Request in once you have the sign-off of two other developers, or if you

do not have permission to do that, you may request the second reviewer to merge it for you.

### Merge to production (just for admins)

1. Merge to master when necessary. All tests must pass.
2. Deploy to AppStore and Google-play android.
  
## Android and iOS deploy

### iOS

1. TODO: fill

### Android

1. TODO: fill

## Code of Conduct


  