import React from 'react';

import { getRecipes } from 'redux/actions/actions';

// Importación de Hooks
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Componentes
import Paginated from 'components/paginated/Paginated';
import SearchBar from 'components/search-bar/SearchBar';

import styles from './Home.module.css'
import Cards from 'components/cards/Cards';
import Filters from 'components/filters/Filters';


const RECIPES_PER_PAGE = 9;

// Input de búsqueda para encontrar recetas por nombre
// Área donde se verá el listado de recetas. Deberá mostrar su:
// Imagen
// Nombre
// Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
// Botones/Opciones para filtrar por por tipo de dieta
// Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por puntuación
// Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina, mostrando las primeros 9 en la primer pagina.
const Home = () => {
    const dispatch = useDispatch();
    // Se trae en la constante todo lo que esta en el estado de recipes
    // El useSelector se usa para traer datos del estado
    // allRecipes = [{receta1}, {receta2}, {receta3}]
    const filteredRecipes = useSelector((state) => state.filteredRecipes);
    // Se traen los errores del estado global
    const error = useSelector((state) => state.msgError);

    const [order, setOrder] = useState('disorderly');
    const [diet, setDiet] = useState('all');

    // PAGINACIÓN ----------------------------------------------------------------------------------------------------
    // Se crea la paginación de 9 recetas por pagina
    // Para renderizar cuando modifique el estado
    const [currentPage, setCurrentPage] = useState(1);
    const lastRecipeInPage = currentPage * RECIPES_PER_PAGE;
    const firstRecipeInPage = lastRecipeInPage - RECIPES_PER_PAGE;
    // Se crea un array con las recetas que se mostrarán en la página actual
    // Se corta el array de todas las recetas con los dos indices inicial y final de la página
    let currentRecipes = filteredRecipes ? filteredRecipes.slice(firstRecipeInPage, lastRecipeInPage) : [];
    // Función para cambiar estado de acuerdo a la página seleccionada
    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    //---------------------------------------------------------------------------------------------------------------

    // useEffect sirve para que el renderizado se realice una sola vez cuando se monta el componente
    // el segundo parámetro es un array vacío, porque no se quiere que se ejecute nuevamente el useEffect
    // cuando se cambie el estado de recipes
    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);

    return (
        <main className={styles.main_home}>

            <div className={styles.bkg}>
                <div className={styles.title_container}>
                    <h1 className={styles.title}>Busque su receta</h1>
                </div>

                {/* Componente Buscar */}
                <div className={styles.search_container}>
                    <SearchBar setPage={setCurrentPage} />
                </div>

                {/* Componente Filtrar */}
                <Filters setPage={setCurrentPage} order={order} setOrder={setOrder} setDiet={setDiet} />

                <nav className={styles.paginated}>
                    <Paginated
                        allRecipes={filteredRecipes.length}
                        paginated={paginated}
                        RECIPES_PER_PAGE={RECIPES_PER_PAGE}
                    />
                </nav>

                {/* Renderiza las recetas */}
                <section className={styles.recipes_container}>
                    {(error.length && <p>{error}</p>) ||
                        (!currentRecipes.length
                            ? (<h2 className={styles.load}> </h2>)
                            : <Cards currentRecipes={currentRecipes} />)
                    }
                </section>

            </div>

        </main>
    );
};

export default Home;
