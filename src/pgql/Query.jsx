const query = `
      {
        mesxp: transaction_aggregate(where: {type: {_eq: "xp"}, event: {path: {_eq: "/dakar/div-01"}}}) {
          aggregate {
            sum {
              amount
            }
          }
        }
        user {
          login
          firstName
          lastName
          email
          campus
          auditRatio
          totalUp
          totalDown
          events(where: {eventId: {_eq: 56}}) {
            level
          }
        }
        xp_view(
          where: {
            path: {_like: "%/dakar/div-01%"}
            _and: [
              {path: {_nlike: "%checkpoint%"}},
              {path: {_nlike: "%piscine-js-2%"}},
              {path: {_nlike: "%piscine-rust%"}}
            ]
          }
          order_by: {amount: desc}
          limit: 6
        ) {
          amount
          originEventId
          path
          userId
        }
         
        progress(order_by: {createdAt:desc}, where: {eventId: {_eq: 56}}, limit : 6) {
        campus
        path
        __typename
        createdAt
        }

        transaction_xp: transaction(
      order_by: {createdAt:desc},where: { type: { _eq: "xp" }, eventId: { _eq: 56 }, event:{path: {_eq:"/dakar/div-01"}} }
    ,  limit: 6) {
      createdAt
      amount
      path
      type
    
    }
        
      }
    `;




const fetchData = async () => {

    try {
        const response = await fetch("https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql", {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('Token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export { query, fetchData };
