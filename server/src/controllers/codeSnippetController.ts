import { Request, Response } from 'express';
import CodeSnippet from '../models/CodeSnippet';
import { AuthenticatedRequest } from '../authenticateJWT';
import User from '../models/User';

async function findAllCodeSnippets(req: Request, res: Response) {
  try {
    // Find in code snippets collection without a filter.
    const codeSnippets = await CodeSnippet.find();
    return res.status(200).json(codeSnippets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function findCodeSnippetById(req: Request, res: Response) {
  try {
    // Find in code snippets collection filtering by id.
    const snippet = await CodeSnippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    return res.json(snippet);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function findCodeSnippetsByText(req: Request, res: Response) {
  const { searchText } = req.params;
  try {
    // Find in code snippets collection where either the title or the content of the code snippet match the regex of the search text (case insensitive).
    const results = await CodeSnippet.find({
      $or: [
        { title: { $regex: searchText, $options: 'i' } },
        { content: { $regex: searchText, $options: 'i' } },
      ],
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
}

async function createCodeSnippet(req: AuthenticatedRequest, res: Response) {
  const { title, content } = req.body;
  const userId = req.userId;

  // If there is no user ID or the user ID is not in the database the request is not authorized.
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // When creating a new code snippet one must be careful of following the schema.
  try {
    const newCodeSnippet = await CodeSnippet.create({
      title,
      content,
      author: req.userId,
    });

    res.status(201).json({ newCodeSnippet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Due to a lack of time this function is currently not usable from the front end.
async function updateCodeSnippet(req: AuthenticatedRequest, res: Response) {
  const { title, content } = req.body;
  const { id } = req.params;

  try {
    const codeSnippet = await CodeSnippet.findOne({ _id: id });

    if (!codeSnippet) {
      return res.status(404).json({ message: 'Code snippet not found' });
    }

    if (codeSnippet.author.toString() !== req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Both the title and the content are updateable.
    codeSnippet.title = title;
    codeSnippet.content = content;

    await codeSnippet.save();

    res.json({ codeSnippet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function upvoteCodeSnippet(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const userId = req.userId;

  // Checks to make sure the user and the snippet exist.
  try {
    const user = await User.findById(userId);
    const codeSnippet = await CodeSnippet.findById(id);
    if (!codeSnippet) {
      return res.status(404).json({ message: 'Code snippet not found' });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If the user had previously voted their vote is removed, otherwise their vote is added and removed from the oppossite count.
    if (codeSnippet.upvotes.includes(user._id)) {
      codeSnippet.upvotes = codeSnippet.upvotes.filter(user => user._id.toString() !== userId)
    } else {
      codeSnippet.upvotes.push(user._id);
      codeSnippet.downvotes = codeSnippet.downvotes.filter(user => user._id.toString() !== userId)
    }
    await codeSnippet.save();
    res.json(codeSnippet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// This function is the exact same as the one above, just inverse logic for down and up voting.
async function downVoteCodeSnippet(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    const codeSnippet = await CodeSnippet.findById(id);
    if (!codeSnippet) {
      return res.status(404).json({ message: 'Code snippet not found' });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (codeSnippet.downvotes.includes(user._id)) {
      codeSnippet.downvotes = codeSnippet.downvotes.filter(user => user._id.toString() !== userId)
    } else {
      codeSnippet.downvotes.push(user._id);
      codeSnippet.upvotes = codeSnippet.upvotes.filter(user => user._id.toString() !== userId)
    }
    await codeSnippet.save();
    res.json(codeSnippet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Comments are saved as a reference to the user and are not limited.
async function commentCodeSnippet (req: AuthenticatedRequest, res: Response) {
  try {
    const { comment } = req.body;
    const { id } = req.params;
    const { userId } = req;

    const user = await User.findById(userId);

    const codeSnippet = await CodeSnippet.findById(id);

    //There needs to be an authenticated user and a valid code snippet for this function to work.

    if (!user) {
      throw new Error('User not found');
    }

    if (!codeSnippet) {
      throw new Error('Code snippet not found');
    }

    // As for code snippets one must be careful of following the schema when creating comments. 
    const newComment = {
      author: user._id,
      content: comment,
    };

    codeSnippet.comments.push(newComment);

    // Save the updated code snippet to the database
    await codeSnippet.save();

    res.status(200).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Massive export for a controller 👀
export {
  findAllCodeSnippets,
  findCodeSnippetById,
  findCodeSnippetsByText,
  createCodeSnippet,
  updateCodeSnippet,
  upvoteCodeSnippet,
  downVoteCodeSnippet,
  commentCodeSnippet
};
