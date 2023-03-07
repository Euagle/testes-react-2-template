import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ProductCard from "../components/ProductsList/ProductCard"

// MOCKS (poderia estar em arquivo separado)
const productMock = {
    id: 1,
    image: "htpps://imagem.png",
    title: "Produto teste",
    price: 1000
}

const addToCartMock = jest.fn()

//TESTES
describe("Product Card", ()=>{

    //Pratica Guiada 1
    test("testar renderizar card de produto", ()=>{

        render(<ProductCard product={productMock} addToCart={addToCartMock}/>)

        //OPICIONAL
        // const title = screen.getByText("Produto teste")
        // expect(title).toBeInTheDocument()
    })

    //Pratica Guiada 2
    test("testar a renderização do titulo, imagem, preço e botão de compra", ()=>{

        render(<ProductCard product={productMock}  addToCart={addToCartMock}/>)

        const title = screen.getByRole('heading', {name: /produto teste/i})
        const image = screen.getByRole('img', { name: /produto teste/i })
        const price = screen.getByText(/\$1000\.00/i)
        const addBtn = screen.getByRole('button', { name: /buy/i })

        expect(title).toBeInTheDocument()
        expect(image).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(addBtn).toBeInTheDocument()
    })

    //Pratica Guida 3
    test("testa quando o produto de compra for clicado chama a funcão de adicionar ao carrinho", async ()=>{

        const user = userEvent.setup()

        render(<ProductCard product={productMock} addToCart={addToCartMock}/>)

        const addBtn = screen.getByRole('button', { name: /buy/i })
        // screen.logTestingPlaygroundURL()

        await user.click(addBtn)

        // como estou utilizando jest.fn(), posso usar metodos especiais de veriricar se a funcão esta funcionando
        
        //Verifica se funçõa foi chamada
        expect(addToCartMock).toBeCalled()

        //verifica quantas vezes foi chamada
        expect(addToCartMock).toBeCalledTimes(1)

        //verifica qual é o argumento passado na função
        expect(addToCartMock).toBeCalledWith(productMock)

    })
        
})