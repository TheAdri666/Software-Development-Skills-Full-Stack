import { Router } from 'express';
import * as CodeSnippetCtrl from '../controllers/codeSnippetController';
import { authenticateJWT } from '../authenticateJWT';

const codeSnippetRouter: Router = Router();

// Get routes relating to code snippets
codeSnippetRouter.get('/', CodeSnippetCtrl.findAllCodeSnippets);
codeSnippetRouter.get('/:searchText', CodeSnippetCtrl.findCodeSnippetsByText);
codeSnippetRouter.get('/id/:id', CodeSnippetCtrl.findCodeSnippetById);

// Post routes relating to code snippets
codeSnippetRouter.post('/', authenticateJWT, CodeSnippetCtrl.createCodeSnippet);
codeSnippetRouter.post('/comment/:id', authenticateJWT, CodeSnippetCtrl.commentCodeSnippet);

// Put routes relating to code snippets
codeSnippetRouter.put('/upvote/:id', authenticateJWT, CodeSnippetCtrl.upvoteCodeSnippet);
codeSnippetRouter.put('/downvote/:id', authenticateJWT, CodeSnippetCtrl.downVoteCodeSnippet);
codeSnippetRouter.put('/:id', authenticateJWT, CodeSnippetCtrl.updateCodeSnippet);

export default codeSnippetRouter;
