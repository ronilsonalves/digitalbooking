

export function NotFoundProducts (props) {

    return (
        <>
        <div className="w-100 rounded bg-light">
            <div className="d-flex align-items-center justify content-center p-2">
                <h2 className="display-2">Ops... não encontramos produtos</h2>
            </div>
                <p className="w-100 fs-6">Não conseguimos encontrar produtos com os filtros selecionados, por favor, tente alterar os filtros e refaça sua busca</p>
        </div>
        </>
    )
}