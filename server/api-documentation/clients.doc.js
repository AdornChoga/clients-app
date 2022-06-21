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
 *         - providers
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
 *       example:
 *         _id: '62b0c0dafnc22a39d5b85c9c'
 *         name: 'Client 1'
 *         email: 'client1@email.com'
 *         phone: '2483569028'
 *         providers: [{id: 1}]
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
 * tags: [Clients]
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
 * /clients/{id}:
 *   get:
 *     summary: Returns a client with the specified id
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: The client was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Client'
 *       400:
 *         description: The server returned an error
 *       404:
 *         description: The client could not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Client404'
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
 *               type: object
 *               required:
 *                 - message:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation of a successfull client creation
 *               example:
 *                 message: The client was successfully created
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
 *               type: object
 *               required:
 *                 - message:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation of a successfull client update
 *               example:
 *                 message: 'Client was updated successfully'
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
