
export default function Display( {calculation, expression} ) {
    return(
        <div id="displays">
            <p className='displays calc'>
                {calculation}
            </p>
            <p id="display" className="displays inp">
                {expression}
            </p>
        </div>
    )
}