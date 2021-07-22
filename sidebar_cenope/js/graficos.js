var ctx = document.getElementById("myChart").getContext("2d");
var mychart = new Chart(ctx,{
    type:"pie",
    data:{
        labels:['col1','col2','col3'],
        datasets:[{
            label:'Num datos',
            data:[10,9,15],
            backgroundColor:[
                'rgb(66,134,244)',
                'rgb(74,135,72)',
                'rgb(229,89,50)',
            ]

        }]
    }
});


var ctx2 = document.getElementById("myChart2").getContext("2d");
var mychart2 = new Chart(ctx2,{
    type:"bar",
    data:{
        labels:['row1','row2','row3'],
        datasets:[{
            label:'Num datos',
            data:[10,9,15],
            backgroundColor:[
                'rgb(66,134,244)',
                'rgb(74,135,72)',
                'rgb(229,89,50)',
            ]
        }]
    },
    options:{
        scales:{
            yAxes:[{
                ticks:{
                    beginAtZero:true
                }
            }]
        }
    }
});