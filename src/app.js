import * as d3 from 'd3'

import controller from './controller'

const app = function() {
  window.app = controller
  loadData().then(() => {
    // Create ascending container
    const ascendingContainer = d3.select('#root')
      .append('div')
      .attr('id', '#bar__ascending')
    // Invoke ascending view function
    ascendingContainer.call(window.app.barchartAscending)
    // Create descending container
    const descendingContainer = d3.select('#root')
      .append('div')
      .attr('id', '#bar__descending')
    // Invoke descending view function
    descendingContainer.call(window.app.barchartDescending)    
  })
}

// Load data
const loadData = function() {
  return new Promise((resolve, reject) => {
    d3.csv('./data.csv')
      .then(entries => {
        entries.forEach(e => {
          controller.handleAddEntry({ 
            ...e, 
            selected: false
          })
        })
        resolve(true)
      })
      .catch(error => reject(error))
  })
}

export default app
