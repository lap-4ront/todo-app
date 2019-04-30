let tasks = []; // all tasks array: 0 - completed, 1 - active

function onLoad() {
    const jsonURL = "https://api.myjson.com/bins/dwbh4";
    $.getJSON(jsonURL, function (data) {
        // let app_name = data.app_name;
        // let copyright = data.copyright;
        // let version = data.version;
        let active_tasks = data.active_tasks;
        let complete_tasks = data.complete_tasks;

        let numTask = 1; // Current task number for div id

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
            $("#active_tasks").append(str);
        });

        addOnClick();

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
    })
}