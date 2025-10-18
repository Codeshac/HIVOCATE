import React, { createContext, useState, ReactNode } from 'react';

type Post = {
  id: string;
  title: string;
  content: string;
  user: string;
};

type RepostContextType = {
  reposts: Post[];
  addRepost: (post: Post) => void;
};

export const RepostContext = createContext<RepostContextType>({
  reposts: [],
  addRepost: () => {},
});

export const RepostProvider = ({ children }: { children: ReactNode }) => {
  const [reposts, setReposts] = useState<Post[]>([]);

  const addRepost = (post: Post) => {
    if (!reposts.find((p) => p.id === post.id)) {
      setReposts([...reposts, post]);
    }
  };

  return (
    <RepostContext.Provider value={{ reposts, addRepost }}>
      {children}
    </RepostContext.Provider>
  );
};