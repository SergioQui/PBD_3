export var itemValueStyle = {
	normal: {
			color: '#2E9AFE',
				borderWidth: 5,
				shadowBlur: 40,
				borderColor: "#2E9AFE",
				shadowColor: 'rgba(0, 0, 0, 0)'
	}
};

export var itemValueTotalStyle = {
	normal: {
			color: '#BDBDBD'
	}
};

export var GraphSleepOpts  = {
				
		title: {
				text: '',
				x: 'center',
				y: 'center',
				textStyle: {
				color: '#2E9AFE',
						fontSize: 24,
				}
		},
		series: [
			{
					name: 'sleep',
					type: 'pie',
					radius: ['89%', '95%'],
					hoverAnimation: false,
					label: {
							normal: {
									show: false,
							}
					},
					data: [
						{
							value: 0,
							itemStyle: itemValueStyle
					},
					{
							value: -1,
							itemStyle: itemValueTotalStyle
					}
				]
			}
		]
	
};



export var AHIOpts  = {
    
    tooltip: {
        show: true,
        trigger: 'item',
        formatter: "{c} BMP"
    },
    toolbox: {
        show : false
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : ['MIN','MAX']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'bmps',
            type:'bar',
            data:[0, 1],
            itemStyle: {
                normal: {
                    color: function(params) {
                        var colorList = [
                          '#2E9AFE','#B5C334'
                        ];
                        return colorList[params.dataIndex]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            }
        },
    ]
};   




export var AHIOptsChartJS  = {
      type: 'bar',
      data: {
        labels: ['MIN', 'MAX'],
        datasets: [{
          data: [0, 0],
          backgroundColor: [
            '#2E9AFE',
            '#FF0000'
          ],
        }],
      },
      options: {
        tooltips: { enabled: true },
        hover: { mode: null },
        animation: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
              drawBorder: false
            },
            ticks: {
              display: true
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
              drawBorder: false
            },
            ticks: {
              display: true,
              beginAtZero: true
            }
          }]
        }
      }
    };