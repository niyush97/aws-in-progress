import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    PutCommand,
    GetCommand,
    ScanCommand,
    DeleteCommand,} from "@aws-sdk/lib-dynamodb";

    const client  = new DynamoDBClient({});
    const dynamo = DynamoDBClient.from(client);
    const tableName = "customers";

    export const handler = async (event, context) => {
        let body;
        let statusCode = 200;
        const headers = {
            "Content-Type" : "application/json",
        };
        try {
            switch(event.routeKey){
            //=> CREATE => POST /customers
                case "POST /customers":
                    let requestJSON = JSON.parse(event.body);
                    await dynamo.send(
                        new PutCommand({
                            TableName : tableName,
                            Item : {
                                customer_id : requestJSON.customer_id,
                                first_name : requestJSON.first_name,
                                last_name : requestJSON.last_name,
                                communication_preference : requestJSON.communication_preference,
                                created_at : new Date().toISOString(),
                            },
                        })
                    );
                    body = `Customer ${requestJSON.customer_id} created successfully`;
                    break;

                //=> READ ALL i.e. GET /customers.
                    case "GET /customers":
                        body = await dynamo.send(
                            new ScanCommand ({TableName : tableName})
                        );
                        body = body.Items;
                        break;

                        //~ READ ONE GET /customer/{id}
                        case "GET /customers/{id}" :
                            body = await dynamo.send(
                                new GetCommand ({
                                    TableName : tableName,
                                    key : {
                                        customer_id : parseInt(event.pathParameters.id),
                                    },
                                })
                            );
                            body = body.Item;
                            break;
                    //=> UPDATE : PUT /customers/{id}
                            case "PUT /customers/{id}" :
                                let updateJSON = JSON.parse(event.body);
                                await dynamo.send(
                                    new PutCommand({
                                        TableName : tableName,
                                        Item : {
                                            customer_id : parseInt(event.pathParameters.id),
                                            first_name : updateJSON.first_name,
                                            last_name : updateJSON.last_name,
                                            communication_preference : updateJSON.communication_preference,
                                            created_at : new Date().toISOString(),
                                        },
                                    })
                                );
                                body = `Customer ${event.pathParameters.id} updated successfully`;
                                break;
            }
        } catch (err) {
            
        }
    }
