const rectWidth = 70
const rectMargin = 10
const svgHeight = 100

const conatainer = d3.select('#app')
              
const fill = {
    enter: "#59210C",
    update: "#FFF6D9",
    exit:"#260C07"
}

const stroke = {
    enter: "#260C07",
    update: "#59210C",
    exit: "#FFF6D9"
}

const svg = conatainer.append('svg')
    .attr('height', svgHeight)
    .attr('overflow', "visible")
    

//create div for button and code tag --> index.html line 13f
const div = conatainer.append('div')
const button = div.append('button')
    .text('Create new data!')
const numberArray = div.append('code')

function generateRoundedCornerBarPath (radius, height, width, x, y ){ //y = svgheight
    if(height < radius)
        radius =  height

    return `M${x},${y}
    L${x},${y - height + radius}
    A${radius},${radius} 0 0 1 ${x+radius},${y-height}
    L${x + width - radius},${y - height}
    A${radius},${radius} 0 0 1 ${x + width},${y - height + radius}
    L${x + width},${y}
    Z`
}

function updateBars() {
  const outTransition = d3.select(svg.node()).transition().duration(500)
  const changeTransition = d3.select(svg.node()).transition().ease(d3.easeElasticOut.amplitude(1.12).period(0.49)).duration(1700)
  
  const data = _.times(_.random(3, 8), i => _.random(1, 100))


  d3.select(svg.node()).selectAll('path')
                .data(data, d => d)
                .join(
                    enter => {
                        return enter.append('path')
                            .attr("d",(d, i)  => generateRoundedCornerBarPath(0, 0, 0,  i * rectWidth, svgHeight))
                            .attr('fill', fill.enter) 
                            .attr('stroke',stroke.enter)
                            .attr('stroke-width', "3px")
                    },
                    update => {
                        return update 
                        .attr('fill', fill.update) 
                        .attr('stroke',stroke.update)
                    },
                    exit => {
                        exit.attr('fill', fill.exit) 
                            .transition(outTransition)
                            .attr('stroke',stroke.exit)
                            .attr("d", (d, i)  => generateRoundedCornerBarPath(0, 0, 0,  i * rectWidth, svgHeight))
                            .remove()
                    }
                )
                .transition(changeTransition)
                .attr("d", (d, i)  => generateRoundedCornerBarPath(10, d,  rectWidth - rectMargin,  i * rectWidth, svgHeight))
              
                
  
  // update div with new data array:
  d3.select(numberArray.node()).text(JSON.stringify(data).replace(/\,/g, ', '))
}

updateBars()
d3.select(button.node()).on('click', updateBars)