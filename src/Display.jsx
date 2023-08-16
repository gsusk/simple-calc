
export default function Display( {calculation, expression} ) {
    return(
        <div id="display">
            <p className='displays calc'>
                {calculation}
            </p>
            <p className="displays inp">
                {expression}
            </p>
        </div>
    )
}