import model from './model'
import views from './views'

class Controller {
  constructor() {
    this.model = model
    this.barchartAscending = views.barchart()
    this.barchartDescending = views.barchart()
    //
    this.model.bindEntriesListChanged(this.onEntriesListChanged.bind(this))
    //
    this.barchartAscending.bindClick((entry) => this.handleUpdateEntry({ id: entry.id, selected: !entry.selected })).bind(this)
    this.barchartDescending.bindClick((entry) => this.handleUpdateEntry({ id: entry.id, selected: !entry.selected })).bind(this)
  }
  //
  handleAddEntry(entry) {
    this.model.addEntry(entry)
  }
  handleUpdateEntry(entry) {
    this.model.updateEntry(entry)
  }
  handleDeleteEntry(entryId) {
    this.model.deleteEntry(entryId)
  }
  //
  onEntriesListChanged() {
    this.barchartAscending.data(this.model.entries)
    this.barchartDescending.data(this.model.entries.slice().reverse())
  }
}

export default new Controller()
