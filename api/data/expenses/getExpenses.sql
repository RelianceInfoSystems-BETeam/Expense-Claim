SELECT [Name]
      ,[Amount]
      ,[Description]
      ,[Date]
      ,[Attachment]
      ,[Method]
      ,[RequestID]
FROM	[ExpenseDB].[dbo].[Expenses]
WHERE	[userId] = @userId
ORDER BY
		[Date]
		