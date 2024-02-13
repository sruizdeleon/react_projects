import { fireEvent, render, screen } from "@testing-library/react"; // Importa desde "@testing-library/react" en lugar de "@testing-library/jest-dom"
import { describe, expect, it } from "vitest"; // No necesitas importar `expect` desde "vitest" ya que ya estás usando las aserciones de `@testing-library/react`
import App from "./App";

describe("Comprueba que la página del contador funciona correctamente", async () => {
	it("La página se renderiza correctamente", async () => {
		render(<App></App>);
        
		// Tiene que haber un H1 en la página que diga CONTADOR
		const h1 = await screen.findByText("CONTADOR");
        
		expect(h1).toBeInTheDocument();
	});
    
    it("Tiene que haber un botón para sumar que indique '+'", async () => {
		render(<App></App>);

		const boton = await screen.getByTestId("boton-suma");

		expect(boton.textContent).toBe("+");
	});

    it("Tiene que haber un botón para restar que indique '-'", async()=>{
        render(<App></App>);

        const boton = await screen.getByTestId("boton-resta")

        expect(boton.textContent).toBe("-")
    })

    it("Tiene que haber texto que marque el estado del contador y este inicie en 0", async()=>{
        render(<App></App>);

        const contador = await screen.getByTestId("contador")

        //busco por id primero y luego por contenido, así evito conflicto que en otros lugares de la página tengan el mismo valor
        expect(contador.textContent).toBe("0")
    })


    it("El botón de sumar debería sumar 1 unidad", async()=>{
        render(<App></App>);

        //busco el botón
        const botonSuma = await screen.getByTestId("boton-suma")

        //hago clic en el botón
        fireEvent.click(botonSuma)

        //busco el contador
        const contador = await screen.getByTestId("contador");

        //compruebo que ha sumado 1
        expect(contador.textContent).toBe("1");

    })


    it("El botón de sumar debería sumar 2 unidad tras hacer dos clics", async()=>{
        render(<App></App>);

        //busco el botón
        const botonSuma = await screen.getByTestId("boton-suma")

        //hago clic en el botón
        fireEvent.click(botonSuma)
        fireEvent.click(botonSuma)

        //busco el contador
        const contador = await screen.getByTestId("contador");

        //compruebo que ha sumado 2 unidades
        expect(contador.textContent).toBe("2");

    })

        it("El botón de restar debería restar 1 unidad", async () => {
			render(<App></App>);

			//busco el botón
			const botonResta = await screen.getByTestId("boton-resta");

			//hago clic en el botón
			fireEvent.click(botonResta);

			//busco el contador
			const contador = await screen.getByTestId("contador");

			//compruebo que ha sumado 1
			expect(contador.textContent).toBe("-1");
		});

        it("El botón de restar debería restar 2 unidades tras hacer dos clics", async () => {
            render(<App></App>);

            //busco el botón
            const botonResta = await screen.getByTestId("boton-resta");

            //hago clic en el botón
            fireEvent.click(botonResta);
            fireEvent.click(botonResta);

                //busco el contador
                const contador = await screen.getByTestId("contador");

                //compruebo que ha restado 2 unidades
                expect(contador.textContent).toBe("-2");
            });

        it("El botón debería restar 1 unidad y sumar una unidad al hacer clic en cada botón y resultar en 0", async () => {
            render(<App></App>);

            //busco el botón suma
            const botonSuma = await screen.getByTestId("boton-suma");

            //busco el botón resta
            const botonResta = await screen.getByTestId("boton-resta");

            //hago clic en el botón restar
            fireEvent.click(botonResta);
            //hago clic en el botón sumar
            fireEvent.click(botonSuma);

            //busco el contador
            const contador = await screen.getByTestId("contador");

            //compruebo que ha restado 2 unidades
            expect(contador.textContent).toBe("0");
        });
});