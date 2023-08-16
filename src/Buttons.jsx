
const buttons = [{ id:'clear', label: 'AC'},{ id:'divide', label: '/', symbol: true},
                 { id:'multiply', label:'x', symbol: true }, { id:'seven', label:'7' }, 
                 { id:'eight', label:'8' }, { id:'nine', label:'9' },
                 { id:'subtract', label:'-', symbol: true }, { id:'four', label: '4' }, { id:'five', label: '5' },
                 { id:'six', label: '6' }, { id:'add', label: '+', symbol: true},
                 { id:'one', label:'1' }, { id:'two', label:'2' }, { id:'three', label:'3' }, 
                 { id:'equals', label:'='}, { id:'zero', label:'0' }, { id:'decimal', label:'.' }]

export default function Buttons({handleClick}) {
    return (
        <div className="button-container">
            {buttons.map(btn => 
                <button className='button-pick' id={btn.id} key={btn.label} onClick={() => handleClick(btn.label)}>
                    {btn.label}
                </button>
            )}
        </div>
    )
}
