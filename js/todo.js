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

        // create html-text for task div
        function setStrDiv(el, num, strikeout, checked) {
            return '<div id="id' + num + '" class="row todoitem">'
                + '<div class="col textitem ' + strikeout + '">' + el + '</div>'
                + '<div class="col-1"><a href="#" class="btn ellipse ' + checked + '"></a></div>'
                + '</div>';
        }

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

        $(".wait").remove(); // delete animated gif
    });
}