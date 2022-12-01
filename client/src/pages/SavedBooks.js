import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { useMutation, useQuery } from '@apollo/client';
const { REMOVE_BOOK } = require('../utils/mutations');
const { GET_ME } = require("../utils/queries");

const SavedBooks = () => {
  // const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  // const userDataLength = Object.keys(userData).length;
  // console.log("Saved books call for data");
  const [deleteBook, {data2,loading2,error2}] = useMutation(REMOVE_BOOK);
  const { loading, error, data} = useQuery(GET_ME);
  if(loading) return "Submitting....";
  if(error) return `error: ${error.message}`;


  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {data.me.savedBooks.length
            ? `Viewing ${data.me.savedBooks.length} saved ${data.me.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {data.me.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={(e) => {
                    // console.log("deltetings");
                    deleteBook({variables:{bookId: book.bookId}});
                    removeBookId(book.bookId);
                  }}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
