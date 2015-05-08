#Gamon Devel
A javascript helper to print js objects on your browser

![Devel Screenshot](screenshot.JPG?raw=true)

##Options

```
var options = {
    title: 'Gamon Devel',
	expandAll: false,
	expandButton: true,
	showTitle: true,
	usePre: false
};
```

##Usage
```
devel(options).output('My Object', data)
       .output('My Navigation', data.navigations)
       .output('My Name', data.name)
       .done();
```

##Use<Pre>
```
var options = {
    usePre:true
}

$('#container').html(devel(options).output('My Object', data).done());
```
