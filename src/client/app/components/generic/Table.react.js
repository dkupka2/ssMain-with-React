import React from 'react';

// generic table subcomponent,
// expects the following props: 
// array: headers (strings), data (strings)
// string: selector, title

class Table extends React.Component {
    constructor(props) {
        super(props)
    }

    makeRows(dataArr, cellType, parentIndex) {
        if (! dataArr) {
            alert("dataArr is undef")
            return
        }
        let newArr = []
        for (let i = 0; i < dataArr.length; i += 1) {
            if (cellType === 'h') {
                newArr.push( <th key={`${parentIndex}-${i}`}>{dataArr[i]}</th> )
            } else {
                newArr.push( <td key={`${parentIndex}-${i}`}>{ dataArr[i] ? dataArr[i].toString() : "null" }</td> )
            }
        }
        return (<tr key={`row-${parentIndex}`}>{newArr}</tr>)
    }

    makeTable(data, headers, selector) {
        const dataRows = []
        const headerRow = this.makeRows(headers, 'h')
        for (let p = 0; p < data.length; p += 1) {
            let dataArr = []
            let pIndex
            for (let i = 0; i < headers.length; i += 1) {
                let header = headers[i]
                let datum = data[p][header]
                pIndex = `${p}-${i}`
                dataArr.push(datum)
            }
            dataRows.push( this.makeRows( dataArr, 'd', pIndex) )
        }

        return(
            <table className={selector}>
                <thead>
                    {headerRow}
                </thead>
                <tbody>
                    {dataRows}
                </tbody>
            </table>
        )
    }

    render() {
        const { data, selector, title} = this.props;
        const headers = Object.keys(data[0]);
        const tableContent = this.makeTable(data, headers, selector);
        return (
            <div className={`${selector}-parentDiv`}>
                <p className={selector}>{title}</p>
                {tableContent}
            </div>
        )
    }
}

export default Table