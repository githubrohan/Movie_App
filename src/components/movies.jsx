import React, { Component } from "react";
import MoviesTable from './moviesTable'
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import {getGenres} from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import {paginate} from '../utils/paginate';
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from './common/searchBox';

class Movies extends Component {
  state = {
    movies: [],
    pageSize:3,
    currentPage:1,
    genres:[],
    searchQuery:"",
    selectedGenre:null,
    sortColumn:{path:'title',order:'asc'}
  };

  componentDidMount(){
    const genres =[{ _id:"",name:'All Genres'},...getGenres()]
    this.setState({movies:getMovies(),genres});
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLike=movie=>{
    const movies=[...this.state.movies];
    const index=movies.indexOf(movie);
    movies[index]={...movies[index]};
    movies[index].liked=!movies[index].liked;
    this.setState({movies});
  }

  handlePageChange=page=>{
    this.setState({currentPage:page});
  }

  handleGenreSelect=genre=>{
    this.setState({selectedGenre: genre,currentPage:1});
  }

  handleSearch= query => {
    this.setState({searchQuery: query, selectedGenre: "", currentPage:1});
  }

  handleSort= sortColumn =>{
    
    this.setState({sortColumn});
  }

  getPagedData =()=>{
    const {pageSize,currentPage,sortColumn,selectedGenre,movies:allMovies,searchQuery}=this.state;
    
    let filtered = allMovies;
    if(searchQuery)
    {
      filtered= allMovies.filter(m=>
          m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        );

    }
    else if(selectedGenre && selectedGenre._id)
    {
      filtered=allMovies.filter(m=> m.genre._id === selectedGenre._id);
    }

    const sorted=_.orderBy(filtered,[sortColumn.path],[sortColumn.order])

    const movies =paginate(sorted,currentPage,pageSize);

    return {totalCount:filtered.length, data:movies};
  }
  render() {
    const { length: count } = this.state.movies;
    const {pageSize,currentPage,sortColumn,searchQuery}=this.state;
    if (count === 0) return <p>There is no movies in the database.</p>;

    const {totalCount, data:movies}= this.getPagedData();
    
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup items={this.state.genres} selectedItem={this.state.selectedGenre} onItemSelect={this.handleGenreSelect}/>
        </div>
        <div className="col-9">
          <Link to="/movies/new" className="btn btn-primary" style={{marginBottom:20}}>New Movies</Link>
        <p>Showing {totalCount} movies in the database.</p>
        <SearchBox value={searchQuery} onChange={this.handleSearch}/>
        <MoviesTable movies ={movies} sortColumn={sortColumn} onLike={this.handleLike} onDelete={this.handleDelete} onSort={this.handleSort}/>
        <Pagination itemsCount={totalCount} currentPage={currentPage} pageSize={pageSize} onPageChange={this.handlePageChange}/>
        </div>
        
      </div>
    );
  }
}

export default Movies;
