const folders = document.querySelectorAll('.nav__folder');
const files = document.querySelectorAll('.nav__file');
const createFolder = document.querySelector('#create_folder')
const deleteFolder = document.querySelector('#delete_folder')
const createFile = document.querySelector('#create_file')
const deleteFile = document.querySelector('#delete_file')
const renameFolder = document.querySelector('#rename_folder')
const renameFile = document.querySelector('#rename_file')
const navigation = document.querySelector('#nav')
const contentHeader = document.querySelector(".content__header")
const contentMain = document.querySelector(".content__main")
const preCode = document.createElement("pre")
const code = document.querySelector("#code")
const tooltip = document.createElement("div")
const newInput = document.createElement("input");
const closedFolderImgSrc = "img/closedFolder.png"
const openedFolderImgSrc = "img/openedFolder.png"
const fileImgSrc = "img/file.png"
let isAnyTabOpened = false;


const jsonData = {
    "python": {
        "example": "import random\n" + "\n" + "    \n" + "    if errors == 0:\n" + "        print('\\nCongratulations! You guessed the word!')\n" + "        break\n" + "    \n" + "    guess = input(\"\\nEnter a letter: \")\n" + "    \n" + "    guesses += guess\n" + "    \n" + "    if guess not in word:\n" + "        attempts += 1\n" + "        print(\"Wrong! You have\", max_attempts - attempts, \"tries left.\")\n" + "    \n" + "    if attempts == max_attempts:\n" + "        print('\\nGame over! The word was', word)"

    }, "javascript": {
        "example": "function isPrime(n) {\n" + "  if (n <= 1) {\n" + "    return false;\n" + "  }\n" + "  for (let i = 2; i <= Math.sqrt(n); i++) {\n" + "    if (n % i === 0) {\n" + "      return false;\n" + "    }\n" + "  }\n" + "  return true;\n" + "}"
    }, "java": {
        "example": "public static void selectionSort(int[] arr) {\n" + "    for (int i = 0; i < arr.length - 1; i++) {\n" + "        int min = i;\n" + "        for (int j = i + 1; j < arr.length; j++) {\n" + "            if (arr[j] < arr[min]) {\n" + "                min = j;\n" + "            }\n" + "        }\n" + "        int temp = arr[i];\n" + "        arr[i] = arr[min];\n" + "        arr[min] = temp;\n" + "    }\n" + "}"
    }, "с++": {
        "example": "void selectionSort(int arr[], int n) {\n" + "    for (int i = 0; i < n - 1; i++) {\n" + "        int min = i;\n" + "        for (int j = i + 1; j < n; j++) {\n" + "            if (arr[j] < arr[min]) {\n" + "                min = j;\n" + "            }\n" + "        }\n" + "        int temp = arr[i];\n" + "        arr[i] = arr[min];\n" + "        arr[min] = temp;\n" + "    }\n" + "}"
    }
}


const openFolder = (folder) => {
    folder.addEventListener('click', (e) => toggleFolderFocus(e, folder))
};


const toggleFolderFocus = (e, folder) => {
    const img = document.createElement("img")

    img.classList.add("icons")

    if (!e.target.classList.contains("active")) {
        img.src = openedFolderImgSrc
        e.target.childNodes[0].replaceWith(img)
    } else {
        img.src = closedFolderImgSrc
        e.target.childNodes[0].replaceWith(img)
    }

    folder.classList.toggle('active');
};

const openFile = (file) => {
    file.addEventListener('dblclick', (e) => openBookmark(e, file))
    const activeElements = document.querySelectorAll('.active');
};

const deleteBtnCreation = (newTab) => {
    const deleteBtn = document.createElement("button")

    deleteBtn.innerText = "X"
    deleteBtn.classList.add("delete__btn")
    deleteBtn.addEventListener("click", () => {
        newTab.remove()
        contentMain.innerHTML = "";
        tabsChecker()
    })
    newTab.insertBefore(deleteBtn, newTab.lastElementChild)
}

const codeAdding = (text) => {

    code.classList.add("language-python")
    code.setAttribute("contenteditable", true)

    switch (text) {
        case "App.xaml":
            code.classList.add("lang-python")
            code.innerHTML = jsonData.python.example
            break
        case "MainWindow.xaml":
            code.classList.add("lang-javascript")
            code.innerHTML = jsonData.javascript.example
            break
        case "MainWindow.cs":
            code.classList.add("lang-java")
            code.innerHTML = jsonData.java.example
            break
        case "package.json":
            code.classList.add("lang-c++")
            code.innerHTML = jsonData["с++"].example
            break
        default:
            code.innerHTML = ""
    }
    preCode.insertBefore(code, preCode.firstChild)
    contentMain.innerHTML = "";
    contentMain.insertBefore(preCode, contentMain.firstChild)
}

const newTabCreator = (e) => {
    const newTab = document.createElement("div")
    newTab.innerHTML = e.currentTarget.innerText
    newTab.classList.add("tabs")
    contentHeader.insertBefore(newTab, contentHeader.firstChild)
    return newTab
}

const tabsChecker = () => {
    const tabs = document.querySelectorAll(".tabs")
    tabs.length  > 0
        ? contentHeader.style.borderBottom = "2px solid #0077aa"
        : contentHeader.style.borderBottom = "none"
}

const openBookmark = (e, file) => {
    file.classList.toggle('active');

    deleteBtnCreation(newTabCreator(e))
    tabsChecker()
    codeAdding(e.currentTarget.innerText)
};

const iconsCreator = (src) => {
    const img = document.createElement("img")
    img.src = src
    img.classList.add("icons")
    return img
}

const newFolderCreator = () => {
    const newFolder = document.createElement("div")
    newFolder.classList.add("nav__folder")
    newFolder.addEventListener('click', function () {
        // Переключаем класс 'active' для текущей папки
        newFolder.classList.toggle('active');
    })
    newFolder.innerHTML = "Новая папка"
    newFolder.insertBefore(iconsCreator(closedFolderImgSrc), newFolder.firstChild)
    return newFolder
}

const newFileCreator = () => {
    const newFile = document.createElement("div")
    newFile.classList.add("nav__file")
    newFile.addEventListener('click', () => newFile.classList.toggle('active'))
    newFile.innerHTML = "Новый файл"
    newFile.insertBefore(iconsCreator(fileImgSrc), newFile.firstChild)
    return newFile
}

const createFolderHandler = () => {
    navigation.insertBefore(newFolderCreator(), navigation.firstChild)
};

const createFileHandler = () => {
    navigation.insertBefore(newFileCreator(), navigation.firstChild)
};


const deleteFolderHandler = () => {
    const activeFolders = document.querySelectorAll('.nav__folder.active');
    activeFolders.forEach((folder) => folder.remove())
};


const deleteFileHandler = () => {
    const activeFiles = document.querySelectorAll('.nav__file.active');
    activeFiles.forEach((files) => files.remove())
};


const renameFolderHandler = () => {
    const activeFolder = document.querySelector('.nav__folder.active');
    newInput.addEventListener('keyup', (e) => inputHandler(e, newInput, "nav__folder", closedFolderImgSrc));
    newInput.classList.add("rename__input");
    activeFolder.replaceWith(newInput);
};

const inputHandler = (e, input, className, imgSrc) => {
    if (e.key === "Enter") {
        const newValue = e.currentTarget.value;

        const newElement = document.createElement("div");
        newElement.innerText = newValue;
        newElement.classList.add("nav__item")
        newElement.classList.add(className)

        input.value = ""
        input.replaceWith(newElement);

        newElement.insertBefore(iconsCreator(imgSrc), newElement.firstChild)
    }
};

const renameFileHandler = () => {
    const activeFile = document.querySelector('.nav__file.active');

    newInput.addEventListener('keyup', (e) => inputHandler(e, newInput, "nav__file", fileImgSrc));
    newInput.classList.add("rename__input");

    activeFile.replaceWith(newInput);
};

const showTooltip = file => {
    file.addEventListener("mouseover", (e) => onFileMouseOverHandler(e, file));
};


const onFileMouseOverHandler = (e, file) => {
    tooltip.classList.add("tooltip")
    tooltip.textContent = e.currentTarget.title

    document.addEventListener("mousemove", event => {
        const x = event.clientX + 10;
        const y = event.clientY + 10;

        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
    });

    document.body.appendChild(tooltip);

    file.addEventListener("mouseout", () => {
        tooltip.remove()
    })
};

const addFolderIcon = (f) => {
    f.insertBefore(iconsCreator(closedFolderImgSrc), f.firstChild)
}

const addFileIcon = (f) => {
    f.insertBefore(iconsCreator(fileImgSrc), f.firstChild)
}

folders.forEach(openFolder);
folders.forEach(addFolderIcon);
files.forEach(openFile);
files.forEach(showTooltip)
files.forEach(addFileIcon)
createFolder.addEventListener("click", createFolderHandler)
createFile.addEventListener("click", createFileHandler)
deleteFolder.addEventListener("click", deleteFolderHandler)
deleteFile.addEventListener("click", deleteFileHandler)
renameFolder.addEventListener("click", renameFolderHandler);
renameFile.addEventListener("click", renameFileHandler);
