export const filterRows = (filter, row, column) => {
    if (row._original[column]) {
        return row._original[column].toUpperCase().includes(
            filter.value.toUpperCase()
        )
    }
}
