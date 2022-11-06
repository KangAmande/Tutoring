﻿using System;
using System.Collections.Generic;

namespace Tutoring_Platform.Models
{
    public partial class User
    {
        public User()
        {
            AdminReplies = new HashSet<AdminReply>();
            Statistics = new HashSet<Statistic>();
            StudTutorInfos = new HashSet<StudTutorInfo>();
        }

        public int Id { get; set; }
        public string? Role { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? Name { get; set; }

        public virtual ICollection<AdminReply> AdminReplies { get; set; }
        public virtual ICollection<Statistic> Statistics { get; set; }
        public virtual ICollection<StudTutorInfo> StudTutorInfos { get; set; }
    }
}