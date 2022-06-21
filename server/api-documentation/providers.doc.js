/**
 * @swagger
 * components:
 *   schemas:
 *     Provider:
 *       type: object
 *       required:
 *         - _id
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the provider
 *       example:
 *         _id: '8b0c1dafnc22a39d5b85c4c'
 *         name: 'Provider 1'
 *     Provider404:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *           description: Error message for a non-existing provider
 *       example:
 *         error: The provider with the specified id could not be found
 */

/**
 * @swagger
 * tags: [Providers]
 */

/**
 * @swagger
 * /providers:
 *   get:
 *     summary: Return a list of all providers
 *     tags: [Providers]
 *     responses:
 *       200:
 *         description: Providers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Provider'
 *       400:
 *         description: The server returned an error
 */

/**
 * @swagger
 * /providers:
 *   post:
 *     summary: Creates a new provider
 *     tags: [Providers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Provider'
 *     responses:
 *       201:
 *         description: The provider was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation of a successfull provider creation
 *               example:
 *                 message: The provider was successfully created
 *       400:
 *          description: Error in request body
 */

/**
 * @swagger
 * /providers/{id}:
 *   patch:
 *     summary: Updates a provider
 *     tags: [Providers]
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
 *             $ref: '#components/schemas/Provider'
 *     responses:
 *       200:
 *         description: The provider was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation of a successfull provider update
 *               example:
 *                 message: 'The provider was updated successfully'
 *       400:
 *         description: The server returned an error
 *       404:
 *         description: The provider with specified id could not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Provider404'
 */

/**
 * @swagger
 * /providers/{id}:
 *   delete:
 *    summary: Deletes a provider with the specified id
 *    tags: [Providers]
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *       description: The provider was successfully deleted
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: Confirmation of a successfull provider deletion
 *             example:
 *               message: 'The provider was deleted successfully'
 *      400:
 *        description: The server returned an error
 *      404:
 *        description: The provider with the specified could not be found
 *        content:
 *          application/json:
 *           schema:
 *             $ref: '#components/schemas/Provider404'
 */
