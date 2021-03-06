/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - _id
 *         - name
 *         - email
 *         - phone
 *       properties:
 *         _id:
 *           type: string
 *           description: An auto-generated unique identifier
 *         name:
 *           type: string
 *           description: The name of the client
 *         email:
 *           type: string
 *           description: The email of the client
 *         phone:
 *           type: string
 *           description: The phone number of the client
 *         providers:
 *           type: array
 *           items:
 *             type: object
 *           description: The providers of the client
 *         createdAt:
 *           type: string
 *           description: The date and time when the client was created
 *         updatedAt:
 *           type: string
 *           description: The date and time when the client was updated
 *       example:
 *         name: 'Example Client'
 *         email: 'exampleclient@email.com'
 *         phone: '2483569028'
 *         providers: [{_id: 'Id of provider'}]
 *     Client404:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *           description: Error message for a non-existing client
 *       example:
 *         error: The client with the specified id could not be found
 */

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Endpoint to manage clients
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Return a list of all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Clients retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Client'
 *       400:
 *         description: The server returned an error
 */

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Creates a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Client'
 *     responses:
 *       201:
 *         description: The client was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Client'
 *       400:
 *          description: Error in request body
 */

/**
 * @swagger
 * /clients/{id}:
 *   patch:
 *     summary: Updates a client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Client'
 *     responses:
 *       200:
 *         description: The client was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Client'
 *       400:
 *         description: The server returned an error
 *       404:
 *         description: The client with provided id could not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Client404'
 */

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *    summary: Deletes a client with the specified id
 *    tags: [Clients]
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *       description: The client was successfully deleted
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: Confirmation of a successfull client deletion
 *             example:
 *               message: 'Client was deleted successfully'
 *      400:
 *        description: The server returned an error
 *      404:
 *        description: The client with the specified could not be found
 *        content:
 *          application/json:
 *           schema:
 *             $ref: '#components/schemas/Client404'
 */
