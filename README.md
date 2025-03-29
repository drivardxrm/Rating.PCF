# Rating.PCF ![GitHub all releases](https://img.shields.io/github/downloads/drivardxrm/Rating.PCF/total?style=plastic)
Configurable rating control based on FluentUI. 
Available icons here : https://developer.microsoft.com/en-us/fabric#/styles/web/icons#available-icons 

# Dependencies
@fluentui/react : https://github.com/microsoft/fluentui

# Parameters
| Parameter         | Description                                                                                  | Default     |
|-------------------|----------------------------------------------------------------------------------------------|----------   |
| Rating Value  | Bound field for Rating (Whole.None)                                                             |             |
| Max Value    | Maximum value for Rating  (Whole.None)                                     | 5|
| Icon   | icon when selected (default : FavoriteStarFill)                                       | FavoriteStarFill   |
| Unselected Icon    | icon when unselected (default : FavoriteStar)                                             |FavoriteStar     |
| Color  | Selected rating color (default : golden(#FFBF00))                                                        | #FFBF00        |

# Screenshots
![alt text](img/rating.png)

![alt text](img/rating_animated.gif)

# Installation
You can install the component directly from solution files containes in the 'Release' section
https://github.com/drivardxrm/Rating.PCF/releases

# Get required tools

To use Microsoft PowerApps CLI, do the following:

* Install Npm (comes with Node.js) or install Node.js (comes with npm). We recommend LTS (Long Term Support) version 10.15.3 LTS as it seems to be most stable.

* Install .NET Framework 4.6.2 Developer Pack.

* If you don’t already have Visual Studio 2017 or later, follow one of the options below:

  * Option 1: Install Visual Studio 2017 or later.
  * Option 2: Install .NET Core 2.2 SDK and then install Visual Studio Code.
* Install Microsoft PowerApps CLI.

Be sure to update your Microsoft PowerApps CLI to the latest version: 
```bash
pac install latest
```
# Build the control

* Clone the repo/ download the zip file.
* Navigate to ./Rating.PCF/ folder.
* Copy the folder path and open it in visual studio code.
* Open the terminal, and run the command the following command to install the project dependencies:
```bash
npm install
```
Then run the command:
```bash
npm run start
```
# Build the solution

* Create a new solution folder and open the Developer command prompt.
* Change the directory to the newly created folder in previous step.
* Init the future solution:
```bash
pac solution init --publisherName someName --customizationPrefix someSolutionPrefix
``` 
* Add the control to your future solution:
```bash
pac solution add-reference --path provide path of control project folder where the pcf.proj is available
``` 
* Build 1/2:
```bash
msbuild /t:restore
``` 
* Build 2/2:
```bash
msbuild
``` 
* You will have the solution file in SolutionFolder/bin/debug folder!

If you want to change the solution type you have to edit the .cdsproj file:
```bash
Solution Packager overrides, un-comment to use: SolutionPackagerType (Managed, Unmanaged, Both)
  <PropertyGroup>
    <SolutionPackageType>Managed</SolutionPackageType>
  </PropertyGroup>

  ```
 

