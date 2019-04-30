const jsonURL = "https://api.myjson.com/bins/dwbh4";

let tasks = []; // all tasks array: 0 - completed, 1 - active
let app_name;
let copyright;
let version;
let active_tasks;
let complete_tasks;

function onLoad() {
    $.getJSON(jsonURL, function (data) {
        let numTask = 1; // Current task number for div id

        app_name = data.app_name;
        copyright = data.copyright;
        version = data.version;
        active_tasks = data.active_tasks;
        complete_tasks = data.complete_tasks;

        // Add active tasks to task list
        active_tasks.forEach(element => {
            let str = setStrDiv(element, numTask, '', '');
            tasks[numTask] = 1;
            numTask++;
            $("#active_tasks").append(str);
        });

        // Add complete tasks to task list
        complete_tasks.forEach(element => {
            let str = setStrDiv(element, numTask, 'strikeout', 'checked');
            tasks[numTask] = 0;
            numTask++;
            $("#complete_tasks").append(str);
        });

        addOnClick(); // Add event handler

        $(".wait").remove(); // delete animated gif
    });
}

// create html-text for task div
function setStrDiv(el, num, strikeout, checked) {
    return '<div class="row todoitem">'
        + '<div id="ida' + num + '" class="col textitem ' + strikeout + '">' + el + '</div>'
        + '<div class="col-1"><a id="id' + num + '" href="#" class="btn ellipse ' + checked + '"></a></div>'
        + '</div>';
}

// Attach an event handler function for class .btn
function addOnClick() {
    $(".btn").on('click', function (event) {
        let id = event.target.attributes[0].value.substr(2);
        let numId = Number.parseInt(id);
        tasks[numId] = 1 - tasks[numId];
        if (tasks[numId] === 0) {
            $("#id" + id).addClass("checked");
            $("#ida" + id).addClass("strikeout");
        } else {
            $("#id" + id).removeClass("checked");
            $("#ida" + id).removeClass("strikeout");
        }
        saveJson();
    })
}

// Save changes
function saveJson() {
    let jsonData = createJson();
    $.ajax({
        url: jsonURL,
        type: "PUT",
        data: jsonData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            // Saved
        }
    });

}

// Create json data
function createJson() {
    let data = "{";
    
    data += '"app_name":"' + app_name + '",';
    data += '"version":' + version + ',';
    data += '"copyright":"' + copyright + '",';
    data += '"active_tasks":[';

    let numTask = 1;
    let strActive = "";
    let strCompleted = "";

    function setOneTaskData(el) {
        if (tasks[numTask] === 1) {
            if (strActive !== "")
                strActive += ',';
            strActive += '"' + el + '"';
        } else {
            if (strCompleted !== "")
                strCompleted += ',';
            strCompleted += '"' + el + '"';
        }
        numTask++;
    }

    active_tasks.forEach(element => setOneTaskData(element));
    complete_tasks.forEach(element => setOneTaskData(element));

    data += strActive + '],"complete_tasks": [' + strCompleted + ']}';

    return data;
}