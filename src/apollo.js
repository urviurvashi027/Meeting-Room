  import { InMemoryCache, ApolloClient} from '@apollo/client';
  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    // link: link,
    uri: "http://smart-meeting.herokuapp.com/",
    headers: 
      {"token":"a123gjhgjsdf6576"}
  })
  

  export default client

